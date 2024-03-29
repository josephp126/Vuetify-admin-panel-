<template>
  <div>
    <v-card class="create-card">
      <v-card-title class="create-title">Create Consignor</v-card-title>
      <div class="create-product">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit" id="create-consignor">
            <validation-provider
              v-slot="{ errors }"
              name="company"
              rules="required"
            >
              <v-text-field
                v-model="company"
                :error-messages="errors"
                label="Company Name"
                required
              ></v-text-field>
            </validation-provider>
            <v-row>
              <v-col md="6">
                <v-text-field
                  v-model="first"
                  label="First"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="last"
                  label="Last"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="E-mail"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="phone"
                  label="Phone"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="stAddress1"
              label="Street Address1"
              required
            ></v-text-field>
            <v-text-field
              v-model="stAddress2"
              label="Street Address2"
              required
            ></v-text-field>
            <v-row>
              <v-col md="4">
                <v-text-field
                  v-model="city"
                  label="City"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field
                  v-model="state"
                  label="State"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field v-model="zip" label="Zip" required></v-text-field>
              </v-col>
            </v-row>
            <div class="create-footer">
              <v-btn class="mr-4" type="submit" :disabled="invalid">
                Add
              </v-btn>
              <v-btn @click="clear"> Back </v-btn>
            </div>
          </form>
        </validation-observer>
      </div>
    </v-card>
    <div v-if="loading" class="text-center loading-button">
      <v-progress-circular
        :size="30"
        color="primary"
        indeterminate
      ></v-progress-circular>
      Adding Product...
    </div>
  </div>
</template>

<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules"
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate"
import consignorService from "../services/consignorService"

setInteractionMode("eager")

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
})

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
})

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
})

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
})

extend("email", {
  ...email,
  message: "Email must be valid",
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  created() {
    this.getConsignors()
  },
  data: () => ({
    company: "",
    first: "",
    last: "",
    email: "",
    phone: "",
    stAddress1: "",
    stAddress2: "",
    city: "",
    state: "",
    zip: "",
    loading: false,
  }),

  methods: {
    submit() {
      let company = this.company
      let first = this.first
      let last = this.last
      let email = this.email
      let phone = this.phone
      let stAddress1 = this.stAddress1
      let stAddress2 = this.stAddress2
      let city = this.city
      let state = this.state
      let zip = this.zip

      var data = {
        company: company,
        first: first,
        last: last,
        email: email,
        phone: phone,
        stAddress1: stAddress1,
        stAddress2: stAddress2,
        city: city,
        state: state,
        zip: zip,
      }

      this.loading = true

      consignorService
        .addConsignor(data)
        .then(res => {
          if (res.code == 200) {
            alert("Successfully added consignor!")
            this.loading = false
          } else {
            alert("Unfortunately, can't add consignor!")
            this.loading = false
          }
        })
        .catch(error => {
          console.log(error)
          alert("Error is occured!")
        })
    },

    clear() {
      window.location.href = "/consignors"
    },
    async getConsignors() {
      consignorService.getConsignors().then(res => {
        this.consignorList = res.data
      })
    },
  },
}
</script>
