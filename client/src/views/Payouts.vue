<template>
  <v-row>
    <!-- kitchen sink -->
    <v-col cols="12">
      <div class="d-flex justify-end create-button">
          <!-- <v-btn class="ma-2 white-col" color="primary" href="/create_payout">
            <v-icon left> mdi-plus </v-icon>
            Create Payout
          </v-btn> -->
      </div>
      <payout-datatable class="custom-spacing"></payout-datatable>
      <div class="create-footer mr-16 mb-3">
        <v-btn @click="back"> Back </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
import PayoutDatatable from "./PayoutDatatable.vue"
export default {
  name: "Payouts",
  components: {
    PayoutDatatable,
  },
  setup() {
    return {}
  },
  methods: {
    back() {
      window.history.back()
    },
  },
}
</script>
