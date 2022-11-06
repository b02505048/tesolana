<template>
  <q-page class="flex column q-gutter-md flex-center">
    <wallet-multi-button />
    <q-btn
      no-caps
      push
      label="Get $$$"
      size="lg"
      color="deep-purple-11"
      text-color="white"
      style="width: 150px"
      @click="send_txn"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { WalletMultiButton } from "solana-wallets-vue";

export default defineComponent({
  name: "IndexPage",

  components: {
    WalletMultiButton,
  },

  setup() {
    return {
      send_txn() {
        console.log("Hello");
      },
    };
  },
});
</script>
