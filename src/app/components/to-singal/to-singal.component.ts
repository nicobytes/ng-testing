import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { DataService } from '@services/data.service';
import { Location } from '@models/location.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-to-singal',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      @let data = locations();
      <article>
        <h1>Locations ({{data?.length}})</h1>
        <ul>
          @for(location of data; track location.id){
            <li>{{ location.name }}</li>
          }
        </ul>
        <button type="button" (click)="getLocations()">Get Location</button>
        <pre>
          <code>{{ data | json }}</code>
        </pre>
      </article>
    </div>
  `,
})
export class ToSingalComponent {

  dataSrv = inject(DataService);
  locations = toSignal(this.dataSrv.getLocations(), {
    initialValue: [],
  });

  getLocations(): void {
    // this.locations.set(this.dataSrv.getLocations());
  }

}
