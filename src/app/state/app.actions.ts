export class Play {
  static readonly type = '[App] Play';
  constructor(public url: string) {}
}

export class Pause {
  static readonly type = '[App] Pause';
  constructor() {}
}

export class Stop {
  static readonly type = '[App] Stop';
  constructor() {}
}
