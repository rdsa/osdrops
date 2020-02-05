<template>
  <v-container class="text-xs-center">
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md6>
        <v-card>
          <div class="card-header">
            <span class="headline">Donate</span>
          </div>
        </v-card>
        <v-card>
          <div class="card-header">
            <span class="headline">Donators</span>
          </div>
          <div>
            <p>Thank you!</p>
            <v-data-table
              class="elevation-1"
              :items="donators"
              hide-actions
              hide-headers
              no-data-text="No donations yet"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.index + 1 }}.</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-center">
                  $ {{ props.item.value.toFixed(2) }}
                </td>
              </template>
            </v-data-table>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import donationData from "@/assets/json/donation-data.json";

export default {
  data: () => ({
    donators: donationData
  })
};
</script>
