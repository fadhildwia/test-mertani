<script lang="ts">
  import type { SensorInterface } from "$lib/types/sensor.ts";

  export let isOpen: boolean = false;
  export let mode: 'create' | 'edit' = 'create';
  export let sensor: SensorInterface;
  export let onSave: () => void;
  export let onClose: () => void;
  
  const formFields = [
    { 
      id: 'nama-sensor', 
      label: 'Nama Sensor', 
      key: 'nama', 
      type: 'text', 
      placeholder: 'Masukkan nama sensor',
      required: true 
    },
    { 
      id: 'id-sensor', 
      label: 'ID Sensor', 
      key: 'idSensor', 
      type: 'text', 
      placeholder: 'Masukkan ID sensor',
      required: true 
    },
    { 
      id: 'faktor-kalibrasi', 
      label: 'Faktor Kalibrasi', 
      key: 'faktorKalibrasi', 
      type: 'text', 
      placeholder: 'Contoh: x*0.2',
      required: false 
    },
    { 
      id: 'satuan-sensor', 
      label: 'Satuan', 
      key: 'satuan', 
      type: 'text', 
      placeholder: 'Contoh: mm, °C, %',
      required: true 
    }
  ];
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066]">
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-[#2C2C30]">
          {mode === 'create' ? 'Tambah Sensor Baru' : 'Edit Sensor'}
        </h2>
        <button
          on:click={onClose}
          class="text-[#6C757D] hover:text-[#212529] transition-colors duration-200"
          aria-label="Tutup Modal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form on:submit|preventDefault={onSave}>
        <div class="space-y-4">
          {#each formFields as field}
            <div>
              <label for={field.id} class="block text-sm font-medium text-[#6C757D] mb-1">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                bind:value={sensor[field.key as keyof SensorInterface]}
                required={field.required}
                class="w-full border border-[#CED4DA] rounded-lg px-3 py-2 text-[#212529] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA000] focus:border-transparent"
                placeholder={field.placeholder}
              />
            </div>
          {/each}

          <!-- Deskripsi -->
          <div>
            <label for="deskripsi-sensor" class="block text-sm font-medium text-[#6C757D] mb-1">
              Deskripsi
            </label>
            <textarea
              id="deskripsi-sensor"
              bind:value={sensor.deskripsi}
              class="w-full border border-[#CED4DA] rounded-lg px-3 py-2 text-[#212529] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA000] focus:border-transparent resize-none"
              rows="3"
              placeholder="Masukkan deskripsi sensor"
            ></textarea>
          </div>
        </div>

        <!-- Tombol -->
        <div class="flex justify-end gap-3 mt-6">
          <button
            type="button"
            on:click={onClose}
            class="px-4 py-2 text-[#6C757D] bg-[#E9ECEF] hover:bg-[#CED4DA] rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-[#FFA000] hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors duration-200"
          >
            {mode === 'create' ? 'Tambah' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}