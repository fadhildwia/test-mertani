<script>
  export let label;
  export let value;
  export let id;
</script>

<div class="grid grid-cols-3 gap-4 items-center">
  <label class="text-sm text-[#6C757D]" for={id}>{label}</label>
  <div class="col-span-2">
    <span id={id} class="text-sm text-gray-900 font-medium">{value}</span>
  </div>
</div>
