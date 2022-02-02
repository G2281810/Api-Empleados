import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ViewChild,ElementRef,NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'app-info-empleados',
  templateUrl: './info-empleados.component.html',
  styleUrls: ['./info-empleados.component.css']
})
export class InfoEmpleadosComponent implements OnInit {
  //Variables para el uso de google maps//
  latitude!: number | undefined;
  longitude!: number| undefined;
  zoom!:number;
  address!: string;
  private geoCoder: any;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor(private service:EmployeeService, private router:ActivatedRoute, private rutas:Router,
    private mapsAPILoader:MapsAPILoader, private ngZone:NgZone) { }
  getparamid:any;

  ngOnInit(): void {
    //Implementando google maps//
    this.mapsAPILoader.load().then(()=>{
      
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed",()=>{
        this.ngZone.run(()=>{
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          
          if(place.geometry === undefined || place.geometry === null){
            return;
          }

          this.latitude = place.geometry.location?.lat();
          this.longitude = place.geometry.location?.lng();
          this.zoom = 12;
        });
      });
    });

    this.getparamid = this.router.snapshot.paramMap.get('idempleado');
      this.service.getSingleEmployee(this.getparamid).subscribe((res)=>{
        console.log(res, 'res=>>');
        this.empleadosForm.patchValue({
          nombreempleado:res.nombreempleado,
          appaterno:res.appaterno,
          apmaterno:res.apmaterno,
          email:res.email,
          password:res.password,
          puesto:res.puesto,
          fecha_n:res.fecha_n,
          domicilio:res.domicilio
        });
      });
  }

  private setCurrentLocation(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position)=>{
        
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;

      });
    }
  }
  markerDragEnd($event: MouseEvent){
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  getAddress(latitude:any, longitude:any){
    this.geoCoder.geocode({'location':{lat: latitude, lng:longitude}},(results:any, status:any)=>{
      console.log(results);
      console.log(status);
      if(status == 'OK'){
        if(results[0]){
          this.zoom = 12;
          this.address = results[0].formatted_address;
        }else{
          window.alert('No results found');
        }
      }else{
        window.alert('Miau' + status);
      }
    });
    
  }

  empleadosForm = new FormGroup({
    'nombreempleado':new FormControl('',Validators.required),
    'appaterno':new FormControl('',Validators.required),
    'apmaterno':new FormControl('',Validators.required),
    'email':new FormControl('',Validators.required),
    'password':new FormControl('',[Validators.required, Validators.minLength(3)]),
    'puesto':new FormControl('',Validators.required),
    'fecha_n':new FormControl('',Validators.required),
    'domicilio':new FormControl('',Validators.required),
  });

  regresar(){
    this.rutas.navigate(['lista-empleados']);
  }

  //Google Maps//

  
}
