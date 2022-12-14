/*
 * Automatically generated by Magic
 */
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { AuthService } from '@app/services/auth-service';
import { MessageService } from '@app/services/message.service';
import { Message } from '@app/services/models/message.model';

import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder
} from '@microsoft/signalr';
import { environment } from '@env/environment';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, OnDestroy {

  // Needed to subscribe to relevant message from other components.
  private subscription: Subscription = null;

  // SignalR connection.
  public hubConnection: HubConnection;

  /**
   * If true, we should obscure UI to avoid user from interacting with it.
   */
  public showObscurer = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private credentialsService: CredentialsService,
    private media: MediaObserver,
    private toastrService: ToastrService) { }

  ngOnInit() {

    // Making sure we subscribe to relevant messages published by other components.
    this.subscription = this.messageService.subscriber().subscribe((msg: Message) => {
      switch(msg.name) {

        case 'magic.app.obscurer.show':
          this.showObscurer = true;
          break;

        case 'magic.app.obscurer.hide':
          this.showObscurer = false;
          break;
      }
    });

    // Initialising SignalR.
    this.initSignalR();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.hubConnection?.stop();
    this.hubConnection = null;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  /*
   * Private helper methods.
   */

  /*
   * Initialising SignalR socket connection
   */
  private initSignalR() {
    let builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl(`${environment.apiUrl}sockets`, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
      accessTokenFactory: () => this.credentialsService.credentials.token,
    }).build();

    this.hubConnection.start().catch(() => {
      if (this.hubConnection === null) {
        return;
      }
      console.error('Could not connect to SignalR socket connection');
      setTimeout(() => {
        console.info('Trying to reconnect to SignalR socket connection');
        this.initSignalR();
      }, 5000);
    });

    // Making sure we handle relevant messages from backend.
    this.hubConnection.on('robo-crm.system', (args) => {
      const msg = JSON.parse(args);
      if (msg.error) {
        this.toastrService.error(msg.message);
      } else {
        this.toastrService.success(msg.message);
      }
    });

    // Making sure we reconnect if socket is closed.
    this.hubConnection.onclose(() => {
      if (this.hubConnection === null) {
        return;
      }
      console.error('Disconnected from SignalR socket connection');
      setTimeout(() => {
        console.info('Trying to reconnect to SignalR socket connection');
        this.initSignalR();
      }, 5000);
    });
  }
}
