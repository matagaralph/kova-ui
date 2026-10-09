declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface KovaConfig {}

  namespace Kova {
    interface DefaultConfig {
      LinkComponent: "a"
      Breakpoint: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
    }

    // Override keys from KovaConfig take precedence over the defaults.
    type Config = Omit<DefaultConfig, keyof KovaConfig> & KovaConfig

    export type LinkComponent = Config["LinkComponent"]
    export type Breakpoint = Config["Breakpoint"]
  }
}

export {}
