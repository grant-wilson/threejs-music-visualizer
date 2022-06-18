import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Pause, Play, Stop } from './app.actions';

type AppStateModel = {
  playing: 'playing' | 'paused' | 'stopped';
  url?: string;
};

@State<AppStateModel>({
  name: 'app',
  defaults: {
    playing: 'stopped',
  },
})
@Injectable()
export class AppState {
  @Action(Play)
  play(ctx: StateContext<AppStateModel>, { url }: Play) {
    ctx.patchState({ playing: 'playing', url });
  }

  @Action(Pause)
  pause(ctx: StateContext<AppStateModel>) {
    ctx.patchState({ playing: 'paused' });
  }

  @Action(Stop)
  stop(ctx: StateContext<AppStateModel>) {
    ctx.patchState({ playing: 'stopped', url: undefined });
  }

  @Selector([AppState])
  static playing(state: AppStateModel) {
    return state.playing;
  }

  @Selector([AppState])
  static url(state: AppStateModel) {
    return state.url;
  }
}
