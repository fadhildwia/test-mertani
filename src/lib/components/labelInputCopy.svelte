<script>
  export let label;
  export let value;
  export let id;
  export let onCopy;
  export let showCopied = false;
</script>

<div class="grid grid-cols-3 gap-4 items-center">
  <label for={id} class="text-sm text-[#6C757D]">{label}</label>
  <div class="col-span-2 border border-[#CED4DA] flex items-center gap-2 py-1 rounded w-fit bg-[#E9ECEF]">
    <input
      id={id}
      type="text"
      class="rounded px-3 py-1 text-sm text-[#6C757D] disabled:bg-[#E9ECEF]"
      value={value}
      disabled
      readonly
    />
    <button on:click={onCopy} class="p-1 text-gray-400" title="Copy" aria-label="Copy">
      <img class="w-5 h-5" src="/copy.svg" alt="copy icon" />
    </button>
    {#if showCopied}
      <span class="text-xs text-green-600">Copied!</span>
    {/if}
  </div>
</div>
