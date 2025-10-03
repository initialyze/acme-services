/* eslint-disable import/no-cycle */

const { searchParams, origin } = new URL(window.location.href);
const branch = searchParams.get('nx') || 'main';

const NX_ORIGIN = branch === 'local' || origin.includes('localhost') ? 'http://localhost:6456/nx' : 'https://da.live/nx';

let expMod;
const DA_EXP = '/public/plugins/exp/exp.js';

async function toggleExp() {
  const exists = document.querySelector('#aem-sidekick-exp');

  // If it doesn't exist, let module side effects run
  if (!exists) {
    expMod = await import(`${NX_ORIGIN}${DA_EXP}`);
    return;
  }

  // Else, cache the module here and toggle it.
  if (!expMod) expMod = await import(`${NX_ORIGIN}${DA_EXP}`);
  expMod.default();
}

(async function sidekick() {
  const sk = document.querySelector('aem-sidekick');
  if (!sk) return;
  sk.addEventListener('custom:experimentation', toggleExp);
}());
