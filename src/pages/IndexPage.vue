<template>
  <q-page class="flex column q-gutter-md flex-center q-mx-md">
    <div class="q-mb-md" style="min-width: 250px">
      <div v-if="!!locationMsg">
        <q-list dark>
          <q-item class="q-my-md">
            <q-item-section avatar>
              <q-icon color="secondary" name="location_on" />
            </q-item-section>

            <q-item-section>{{ locationMsg }}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-else class="q-my-md">
        <q-list dark>
          <q-item class="q-my-md">
            <q-item-section avatar>
              <q-icon color="secondary" name="location_on" />
            </q-item-section>

            <q-item-section><q-skeleton type="text" /></q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div
      class="row q-ma-none"
      :class="{
        'w-full': $q.platform.is.mobile,
        'w-half': $q.platform.is.desktop,
      }"
    >
      <q-input
        dark
        outlined
        v-model="target"
        placeholder="Solana wallet address"
        class="col-12"
      >
        <template v-slot:prepend>
          <q-avatar>
            <img src="https://cryptologos.cc/logos/solana-sol-logo.png" />
          </q-avatar>
        </template>
      </q-input>
    </div>
    <div
      class="flex row q-gutter-sm q-ma-none q-my-xl justify-around"
      :class="{
        'w-full': $q.platform.is.mobile,
        'w-half': $q.platform.is.desktop,
      }"
    >
      <q-btn
        no-caps
        push
        label="Share"
        size="lg"
        color="cyan-6"
        text-color="white"
        class="col-5 q-ma-none"
        @click="shareLocation()"
      />
      <q-btn
        no-caps
        push
        label="Track"
        size="lg"
        color="deep-purple-11"
        text-color="white"
        class="col-5 q-ma-none"
        @click="trackLocation()"
      />
    </div>
  </q-page>
</template>

<script>
import * as grasscrete from "../../public/grasscrete";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const router = useRouter();
    const target = ref("");
    const lng = ref(null);
    const lat = ref(null);
    const locationMsg = ref(null);

    const shareLocation = () => {
      if (!!!target.value) {
        alert("Please enter a wallet address.");
        return;
      }

      // Encrypting the location by using FHE
      let eLat = grasscrete.encrypt(lat.value);
      let eLng = grasscrete.encrypt(lng.value);

      // Send transaction to the program to update location
      // Also add the target wallet address as friend
      alert(
        `Encrypted the location into ${eLat}, ${eLng}\nMeanwhile, added ${target.value} as your friend.`
      );
    };

    const trackLocation = () => {
      if (!!!target.value) {
        alert("Please enter a wallet address.");
        return;
      }

      // Forward the target address to MapPage.vue and
      // send transaction to the program to fetch location
      // then decrypt by using the user secret key and display
      router.push({
        path: "map",
        query: {
          t: target.value,
        },
      });
    };

    onMounted(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lng.value = position.coords.longitude;
          lat.value = position.coords.latitude;
          locationMsg.value = `${lat.value}, ${lng.value}`;
        });
      } else {
        locationMsg.value = "Geolocation is not supported by this browser.";
      }
    });

    return {
      locationMsg,
      target,
      // methods
      shareLocation,
      trackLocation,
    };
  },
});
</script>

<style scoped>
.w-full {
  width: 100%;
}

.w-half {
  width: 50%;
}
</style>
