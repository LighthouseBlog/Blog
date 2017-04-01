import { AngularBlogPage } from './app.po';

describe('angular-blog App', () => {
  let page: AngularBlogPage;

  beforeEach(() => {
    page = new AngularBlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
