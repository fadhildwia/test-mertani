<script lang="ts">
  export let currentPage: number = 1;
  export let totalPages: number = 1;
  export let itemsPerPage: number = 5;
  export let onPageChange: (page: number) => void;
  export let onItemsPerPageChange: () => void;
  
  const itemsPerPageOptions = [5, 10, 20];
</script>

<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-[#E0E0E0]">
  <div class="flex items-center text-sm text-[#6C757D]">
    <span>Tampilkan</span>
    <select 
      bind:value={itemsPerPage} 
      on:change={onItemsPerPageChange} 
      class="mx-2 border border-[#CED4DA] rounded px-2 py-1 text-sm"
    >
      {#each itemsPerPageOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
    <span>{currentPage} dari {totalPages} Halaman</span>
  </div>
  
  <div class="flex items-center gap-2">
    <button
      aria-label="Halaman sebelumnya"
      on:click={() => onPageChange(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
      class="p-2 text-[#6C757D] hover:text-[#212529] disabled:opacity-40 transition-colors duration-200"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      aria-label="Halaman berikutnya"
      on:click={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
      class="p-2 text-[#6C757D] hover:text-[#212529] disabled:opacity-40 transition-colors duration-200"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>