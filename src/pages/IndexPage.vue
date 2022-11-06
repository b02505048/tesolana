<template>
  <q-page class="flex column q-gutter-md flex-center q-mx-md">
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
      class="flex row q-gutter-sm q-ma-none q-my-md justify-around"
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
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const router = useRouter();
    const target = ref("");

    const shareLocation = () => {
      console.log("Sharing...", target.value);
    };

    const trackLocation = () => {
      console.log("Tracking...", target.value);
      router.push({
        path: "map",
        query: {
          t: target.value,
        },
      });
    };

    return {
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
