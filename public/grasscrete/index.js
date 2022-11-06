// This is just for the demo
// so we set the shared pk to be 0.2
const sharedPubkey = 0.2;

const gen_sk = () => {
  return Math.random();
};

const gen_pk = (sk) => {
  return 1.0 / sk;
};

const encrypt = (x) => {
  return x * sharedPubkey;
};

const decrypt = (x, sk) => {
  return x * sk;
};

export { gen_sk, gen_pk, encrypt, decrypt };
