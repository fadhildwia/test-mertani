<script>
  export let label;
  export let value;
  export let id;
</script>

<div class="grid grid-cols-3 gap-4 items-center">
  <label for={id} class="text-sm text-[#6C757D]">{label}</label>
  <div class="col-span-2 border border-[#CED4DA] flex items-center gap-2 py-1 pr-2 rounded w-fit bg-[#E9ECEF]">
    <input
      id={id}
      type="text"
      class="rounded px-3 py-1 text-sm text-[#6C757D] disabled:bg-[#E9ECEF]"
      value={value}
      disabled
      readonly
    />
    <img class="w-5 h-5" alt="checklist" src="/checklist.svg" />
  </div>
</div>
