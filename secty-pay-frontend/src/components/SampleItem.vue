<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs10 sm6 md4 lg3>
        <v-card hover>
          <v-img
            src="https://media.giphy.com/media/Wv3vqRR2SiBBC/giphy.gif"
            height="220px">
          </v-img>

          <v-card-title primary-title>
            <div>
              <div class="headline">Top Toy Tank</div>
              <span class="primary--text">HK$199.00</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <credit-card-form v-if="isAuthenticated"/>
            <v-btn v-else flat>Login To Purchase</v-btn>
          </v-card-actions>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'sampleItemForSale',
  components: {
    CreditCardForm: () => import('@/components/CreditCardForm.vue'),
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>
