<template>
<v-container fluid>
  <v-layout justify-center>
    <v-flex xs8 v-if="isAuthenticated">
      <h2 class="mb-4">Purchase History</h2>
      <v-data-table
        :headers="headers"
        :pagination.sync="pagination"
        :items="videos">
        <template slot="items" slot-scope="props">
          <td class="text-xs">
            {{ props.item.name }}
          </td>
          <td class="text-xs">
            {{ getPrice(props.item.price) }}
          </td>
          <td class="text-xs">
            {{ dateFormat(props.item.createdAt) }}
          </td>
        </template>
        <template slot="no-data">
          ...
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import PaymentService from '@/api/app/Payment';
import formatDate from '@/filters/date';
import currency from '@/filters/currency';

export default {
  name: 'purchase-history',
  data() {
    return {
      headers: [
        {
          text: 'Purchased Item',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Price',
          value: 'price',
        },
        {
          text: 'Purchased At',
          value: 'time',
        },
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true,
      },
      videos: [],
    };
  },
  async mounted() {
    if (this.isAuthenticated) {
      this.videos = (await PaymentService.history()).data;
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    dateFormat(time) {
      return formatDate(time);
    },
    getPrice(price) {
      return currency.format(price / 100);
    },
  },
};
</script>
