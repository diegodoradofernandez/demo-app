import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  //https://unsplash.com/

    //accesskey
    //39488dda8af85a2bb0582f78265b446d49e13ab8e4d047e0a21f9f9bba44079e

    //Secret key
    //fd4308d80a038dc5fb5ccf66a6e9f93d276d71271ea3056260df9ce29b71959d

 