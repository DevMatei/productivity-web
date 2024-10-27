import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || '',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

class OutlookService {
  private client: Client | null = null;
  private account: AccountInfo | null = null;

  async initialize() {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      this.account = accounts[0];
      await this.initializeGraphClient();
    }
  }

  private async initializeGraphClient() {
    if (!this.account) return;

    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance, {
      account: this.account,
      scopes: ['Calendars.Read', 'Calendars.ReadWrite'],
      interactionType: 'popup',
    });

    this.client = Client.initWithMiddleware({
      authProvider,
    });
  }

  async login() {
    try {
      const result = await msalInstance.loginPopup({
        scopes: ['Calendars.Read', 'Calendars.ReadWrite'],
      });
      this.account = result.account;
      await this.initializeGraphClient();
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async getEvents(startDate: Date, endDate: Date) {
    if (!this.client) {
      throw new Error('Graph client not initialized');
    }

    try {
      const response = await this.client
        .api('/me/calendarView')
        .query({
          startDateTime: startDate.toISOString(),
          endDateTime: endDate.toISOString(),
        })
        .select('subject,start,end,location,bodyPreview')
        .orderby('start/dateTime')
        .get();

      return response.value.map((event: any) => ({
        id: event.id,
        title: event.subject,
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
        location: event.location.displayName,
        description: event.bodyPreview,
        isOutlookEvent: true,
      }));
    } catch (error) {
      console.error('Error fetching Outlook events:', error);
      throw error;
    }
  }
}

export const outlookService = new OutlookService();