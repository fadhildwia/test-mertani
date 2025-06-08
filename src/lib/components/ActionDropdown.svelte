<script lang="ts">
  export let isOpen: boolean = false;
  export let onEdit: () => void;
  export let onCalibrate: () => void;
  export let onDelete: () => void;
  export let onToggle: () => void;
</script>

<div class="relative dropdown-container">
  <button
    on:click={onToggle}
    class="text-[#6C757D] hover:text-[#212529] p-1 transition-colors duration-200"
    aria-label="Tampilkan aksi sensor"
  >
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
  </button>
  
  {#if isOpen}
    <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-[#E0E0E0]">
      <div class="py-1">
        <button
          on:click={onEdit}
          class="flex items-center w-full px-4 py-2 text-sm text-[#212529] hover:bg-[#F8F9FA] transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Ubah Sensor
        </button>
        <button
          on:click={onCalibrate}
          class="flex items-center w-full px-4 py-2 text-sm text-[#212529] hover:bg-[#F8F9FA] transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
          Kalibrasi
        </button>
        <button
          on:click={onDelete}
          class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Hapus
        </button>
      </div>
    </div>
  {/if}
</div>