import { Ng3AdminPage } from './app.po';

describe('ng3-admin App', () => {
  let page: Ng3AdminPage;

  beforeEach(() => {
    page = new Ng3AdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
