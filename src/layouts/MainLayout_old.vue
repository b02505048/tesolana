<template>
  <q-layout view="lHh Lpr lFf" class="bg-black">
    <q-header elevated class="bg-solana">
      <q-toolbar>
        <q-btn flat dense round icon="settings" aria-label="Settings" />

        <q-toolbar-title class="text-center"> Tesolana </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="info"
          aria-label="Connect"
          @click="connectWallet()"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { initWallet, useWallet } from "solana-wallets-vue";

// You can either import the default styles or create your own.
import "solana-wallets-vue/styles.css";

import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { disconnect } from "process";

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter({ network: "devnet" }),
  ],
  autoConnect: true,
};

initWallet(walletOptions);

export default defineComponent({
  name: "MainLayout",

  setup() {
    const pk = ref("");

    const { publicKey, connect, disconnect } = useWallet();

    const connectWallet = async () => {
      // console.log("Connecting wallet...");
      // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      // const connection = new Connection("http://127.0.0.1:8899", "confirmed");
      // console.log("Connected", connection);
      if (pk.value !== null) {
        console.log("Connecting...");
        connect();
      } else {
        console.log("Disconnecting...");
        // disconnect();
      }

      pk.value = publicKey;
      console.log(JSON.stringify(pk.value));
    };

    return {
      connectWallet,
      pk,
    };
  },
});
</script>

<style scoped>
.bg-solana {
  background: linear-gradient(
    270deg,
    rgb(171, 102, 255) 0%,
    rgb(20, 241, 149) 101.39%
  );
}
</style>
