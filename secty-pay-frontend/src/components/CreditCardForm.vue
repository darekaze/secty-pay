<template>
<v-layout row justify-center>
  <v-dialog v-model="dialog" persistent max-width="480px">
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
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="purchase">Purchase</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import AuthService from '@/api/app/Auth';

const openpgp = require('openpgp');

export default {
  name: 'creditCardForm',
  data() {
    return {
      cardnumber: '',
      expiry: '',
      cvc: '',
      pubkey: '',
      token: '',
      error: null,
      dialog: false,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
  },
  methods: {
    async purchase() {
      // payment logic here
      // TODO: Use crypto
      try {
        const response1 = await AuthService.purchase({
          pubkey: 't',
        });
        if (response1) {
          const creditcard = {
            cardnumber: this.cardnumber,
            expiry: this.expiry,
            cvc: this.cvc,
          };
          const options = {
            message: openpgp.message.fromText(JSON.stringify(creditcard)),
            publicKeys: (await openpgp.key.readArmored(response1.data)).keys,
          };
          console.log(JSON.stringify(options));
          openpgp.encrypt(options).then(async (cipherText) => {
            const response2 = await AuthService.purchase({
              message: cipherText.data,
            });
            alert(JSON.stringify(response2.data)); // FIXME: should return jwt
          });
        }
      } catch (error) {
        console.log('Error has occur');
      }
    },
  },
};
</script>
