<template>
  <q-layout view="lHh Lpr lFf" class="bg-black">
    <q-header elevated class="bg-solana">
      <q-toolbar class="row">
        <div class="col-2">
          <!-- <q-btn flat dense round icon="settings" aria-label="Settings" /> -->
        </div>

        <q-toolbar-title
          class="col-8 text-center"
          style="cursor: pointer"
          @click="$router.push('/')"
        >
          Tesolana
        </q-toolbar-title>

        <div class="col-2 text-right">
          <q-btn
            flat
            dense
            no-caps
            :icon="!!wallet.pubKey ? 'account_circle' : 'no_accounts'"
            :label="!!wallet.pubKey ? wallet.name : 'Login'"
            aria-label="Connect"
            @click="connectWallet()"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import * as web3 from "@solana/web3.js";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const wallet = ref({ pubKey: null, pubKeyString: null, name: null });
    const programId = new web3.PublicKey(
      "AE9WnKy3CRy4ohYGcZG9NDhbAsLHmnEUHd46U1p496Ci"
    );
    const TESOLANA_SEED = "tesolana";

    const getProvider = () => {
      if ("solana" in window) {
        let solana = window.solana;
        if (solana.isPhantom) return solana;
      }
    };

    const connectWallet = async () => {
      const provider = getProvider();
      if (!!!provider) alert("No Solana wallet found.");
      try {
        const response = await provider.connect();
        const pubKey = response.publicKey;
        wallet.value.pubKey = pubKey;
        wallet.value.pubKeyString = pubKey.toString();
        wallet.value.name = `${pubKey.toString().substring(0, 5)}...${pubKey
          .toString()
          .slice(-3)}`;
      } catch (err) {
        console.log(err);
      }
    };

    const registerUser = async (
      connection,
      seed = TESOLANA_SEED,
      programId
    ) => {
      const provider = getProvider();
      const response = await provider.connect();
      const walletPubKey = response.publicKey;

      // dataPubKey holds write permission to account data
      // each user makes dataPubKey
      // service registration
      let dataPubKey = await web3.PublicKey.createWithSeed(
        walletPubKey,
        seed,
        programId
      );

      // getAccountInfo to get account_info
      const accountInfo = await connection.getAccountInfo(dataPubKey);

      // if account does not exist, create account
      // need to pay lamports depends on datasize
      if (accountInfo === null) {
        const lamports = await connection.getMinimumBalanceForRentExemption(10);

        // account is data account
        const transaction = new web3.Transaction().add(
          web3.SystemProgram.createAccountWithSeed({
            fromPubkey: walletPubKey,
            basePubkey: walletPubKey,
            seed: seed, // seed must be same
            newAccountPubkey: dataPubKey, // associate account to dataPubKey
            lamports,
            space: 10,
            programId,
          })
        );

        // create account
        // await sendAndConfirmTransaction(connection, transaction, [payer]);

        // For phantom signing the transaction
        let latestBlockhash = await connection.getLatestBlockhash("finalized");
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = walletPubKey;
        const { signature } = await provider.signAndSendTransaction(
          transaction
        );
        await connection.getSignatureStatus(signature);
        // await provider.sendTransaction(transaction, connection);
      }

      return dataPubKey;
    };

    onMounted(() => {
      // Get the pubKey of user
      connectWallet();

      // Create the connection
      const connection = new web3.Connection("http://127.0.0.1:8899");

      // Check if the user is registered
      const dataPubKey = registerUser(connection, TESOLANA_SEED, programId);
      console.log("Data Account:", dataPubKey);
    });

    return {
      wallet,
      connectWallet,
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
