<template>
  <div
    :class="
      [
        'text-6xl',
        'mb-3',
        'mt-1',
        'text-ellipsis',
        'font-thin',
        'first-letter:text-7xl',
        'first-letter:font-light',
      ].join(' ')
    "
  >
    <slot></slot>
  </div>
</template>
