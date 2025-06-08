<script lang="ts">
  export let columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
  }> = [];
</script>

<thead class="bg-[#F8F9FA] border-b border-[#E0E0E0]">
  <tr>
    {#each columns as column}
      <th class="px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
        {column.label}
        {#if column.sortable}
          <svg class="inline-block ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        {/if}
      </th>
    {/each}
  </tr>
</thead>