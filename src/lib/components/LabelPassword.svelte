<script>
  export let label;
  export let value;
  export let id;
  export let show;
  export let toggleShow;
</script>

<div class="grid grid-cols-3 gap-4 items-center">
  <label class="text-sm text-[#6C757D]" for={id}>{label}</label>
  <div class="col-span-2 flex items-center gap-2 border border-[#CED4DA] py-1 bg-[#E9ECEF] w-fit rounded">
    <span id={id} class="text-sm text-[#6C757D] px-3 py-1">
      {show ? value : '********'}
    </span>
    <button 
      on:click={toggleShow}
      class="p-1 text-gray-400 hover:text-gray-600"
      title={show ? 'Hide password' : 'Show password'}>
      <img
        class="w-5 h-5"
        alt={show ? 'eye-password-show' : 'eye-password-hide'}
        src={show ? '/eye-password-show.svg' : '/eye-password-hide.svg'}
      />
    </button>
  </div>
</div>
