<script lang="ts">
  export let searchTerm: string = '';
  export let searchField: string = 'nama';
  export let onSearch: () => void;
  
  const searchOptions = [
    { value: 'nama', label: 'Nama' },
    { value: 'idSensor', label: 'ID Sensor' },
    { value: 'satuan', label: 'Satuan' }
  ];
</script>

<div class="flex items-center gap-0 bg-[#F8F9FA] border border-[#E0E0E0] rounded-lg overflow-hidden w-fit">
  <div class="relative">
    <select 
      bind:value={searchField} 
      on:change={onSearch}
      class="appearance-none bg-transparent px-3 py-2 text-[#212529] text-sm focus:outline-none border-0 cursor-pointer pr-8"
    >
      {#each searchOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
    <svg class="absolute right-2 top-2.5 h-4 w-4 text-[#6C757D] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
  <div class="w-px h-6 bg-[#E0E0E0]"></div>
  <div class="relative flex-1">
    <input
      type="text"
      placeholder="Cari"
      bind:value={searchTerm}
      on:input={onSearch}
      class="w-full px-3 py-2 pr-10 text-[#212529] text-sm focus:outline-none placeholder-[#6C757D] bg-white border-0"
    />
    <svg class="absolute right-3 top-2.5 h-4 w-4 text-[#6C757D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
</div>