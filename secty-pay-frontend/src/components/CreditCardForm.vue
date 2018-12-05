<template>
<v-layout row justify-center>
  <v-dialog v-model="formDialog" persistent max-width="480px">
    <v-btn
      slot="activator"
      color="purple"
      flat dark>
      Buy It
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Payment</span>
      </v-card-title>
      <v-card-text>
        <div class="error" v-html="error" />
        <v-form ref="form" lazy-validation>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  class="mx-2"
                  mask="credit-card"
                  label="Card Number"
                  v-model="cardnumber"
                  append-icon="credit_card"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  class="mx-2"
                  mask="##/##"
                  label="Expiry"
                  v-model="expiry"
                  hint="MM/YY"
                  append-icon="date_range"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  type="password"
                  class="mx-2"
                  mask="###"
                  label="CVC"
                  v-model="cvc"
                  hint="3 digits at the back of the card"
                  append-icon="security"
                  required>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="formDialog = false">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="purchase">Purchase</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="successDialog"
    max-width="290">
    <v-card>
      <v-card-text>
        <v-layout column align-center justify-center>
          <v-icon large color="green darken-2">check_circle</v-icon>
          <h3 class="pt-2 font-weight-medium brown--text"> Payment Successfully! Thank you!</h3>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="cyan darken-1"
          flat="flat"
          @click="closeAll">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import PaymentService from '@/api/app/Payment';
import AuthorizeService from '@/api/payment/Authorize';

const openpgp = require('openpgp');

export default {
  name: 'creditCardForm',
  data() {
    return {
      cardnumber: '',
      expiry: '',
      cvc: '',
      price: 19900,
      error: null,
      formDialog: false,
      successDialog: false,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
  },
  methods: {
    async purchase() {
      try {
        const { merchantToken } = (await PaymentService.get()).data;
        const pubKey = (await AuthorizeService.getPubKey()).data;
        const paymentInfo = {
          creditCard: {
            cardnumber: this.cardnumber,
            expiry: this.expiry,
            cvc: this.cvc,
          },
          amount: this.price,
          merchantIdentity: merchantToken,
        };
        const options = {
          message: openpgp.message.fromText(JSON.stringify(paymentInfo)),
          publicKeys: (await openpgp.key.readArmored(pubKey)).keys,
        };

        openpgp.encrypt(options).then(async (cipherText) => {
          const { AuthorizationToken } = (await AuthorizeService.getAuthorizeToken({
            message: cipherText.data,
          })).data;

          await PaymentService.pay(AuthorizationToken);
          this.successDialog = true;
        });
      } catch (error) {
        console.log('Error has occur when communicate with the server'); // eslint-disable-line no-console
      }
    },
    closeAll() {
      this.successDialog = false;
      this.formDialog = false;
      this.$refs.form.reset();
    },
  },
};
</script>
