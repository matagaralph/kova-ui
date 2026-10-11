/**
 * Offsets only apply along the alignment axis for "start" and "end" alignments,
 * so centered popups stay centered on their trigger.
 */
export const getAlignOffset = (align: string | undefined, alignOffset: number | undefined) =>
  align === "start" || align === "end" ? alignOffset : 0
