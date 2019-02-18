<template>
  <v-container class="text-xs-center">
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md6>
        <v-card>
          <div class="card-header">
            <span class="headline">Donate</span>
          </div>
          <div>
            <p class="subheading">
              If you like this project consider making a donation!
            </p>
            <p class="subheading">
              If you donate with PayPal you can choose to show your RSN on the
              list below, just include your RSN in the PayPal message box.
              Please note that I need to manually update the list, so it may
              take some time for your RSN to show here.
            </p>
            <v-layout justify-center align-center row>
              <form
                action="https://www.paypal.com/cgi-bin/webscr"
                method="post"
                target="_top"
              >
                <input type="hidden" name="cmd" value="_donations" />
                <input type="hidden" name="business" value="S33PYYL3EL5PG" />
                <input type="hidden" name="currency_code" value="USD" />
                <input
                  type="image"
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
                  border="0"
                  name="submit"
                  title="PayPal - The safer, easier way to pay online!"
                  alt="Donate with PayPal button"
                />
                <img
                  alt=""
                  border="0"
                  src="https://www.paypal.com/en_BR/i/scr/pixel.gif"
                  width="1"
                  height="1"
                />
              </form>
            </v-layout>
            <p>
              or
              <a
                class="blue--text"
                href="https://commerce.coinbase.com/checkout/049dfcb5-c14e-4682-90cd-dc1d3242c2b6"
              >
                <span>Donate with Crypto</span>
              </a>
            </p>
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
