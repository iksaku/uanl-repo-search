<script>
  import logo from '$assets/logo.svg?raw'

  let className

  export { className as class }
</script>

<div class={className}>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- build-time constant from our own asset -->
  {@html logo}
</div>
