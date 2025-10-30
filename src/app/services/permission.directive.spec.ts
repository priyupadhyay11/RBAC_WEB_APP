import { PermissionDirective } from './permission.directive';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
describe('PermissionDirective', () => {
  it('should create an instance', () => {
    const directive = new PermissionDirective();
    expect(directive).toBeTruthy();
  });
});
