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
                class="mx-2"
                mask="###"
                label="CVC"
                v-model="cvc"
                hint="3 digits at the back of the card"
                append-icon="security"
                required>
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                class="mx-2"
                label="ZIP"
                append-icon="markunread_mailbox"
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

export default {
  name: 'creditCardForm',
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
  },
  methods: {
    purchase() {
      // payment logic here
      // TODO: Use crypto
    },
  },
};
</script>
