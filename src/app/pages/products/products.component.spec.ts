import { fakeAsync } from '@angular/core/testing';
import { generateManyProducts } from '@models/product.mock';
import { ProductsService } from '@services/product.service';
import { ValueService } from '@services/value.service';
import {
  mockProvider,
  createRoutingFactory,
  Spectator,
  SpyObject,
  byTestId,
} from '@ngneat/spectator/jest';
import { mockObservable, asyncData, asyncError } from '@testing/index';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let spectator: Spectator<ProductsComponent>;
  let component: ProductsComponent;
  let productService: SpyObject<ProductsService>;
  let valueService: SpyObject<ValueService>;

  const createComponent = createRoutingFactory({
    component: ProductsComponent,
    providers: [
      mockProvider(ProductsService, {
        getAll: jest
          .fn()
          .mockReturnValue(mockObservable(generateManyProducts(3))),
      }),
      mockProvider(ValueService),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    productService = spectator.inject(ProductsService);
    valueService = spectator.inject(ValueService);
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests for getAllProducts', () => {
    it('should return a product list from service', () => {
      // Arrange
      const productsMock = generateManyProducts(10);
      const lengthPrev = spectator.component.products.length;
      productService.getAll.mockReturnValue(mockObservable(productsMock));
      // Act
      component.getAllProducts();
      spectator.detectChanges();
      // Assert
      expect(component.products.length).toEqual(
        productsMock.length + lengthPrev,
      );
      expect(productService.getAll).toHaveBeenCalled();
    });

    it('should return change the status "loading" => "success"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.mockReturnValue(asyncData(productsMock));

      component.getAllProducts();
      spectator.detectChanges();

      expect(component.status).toEqual('loading');

      spectator.tick(); // flush the observable and resolve data

      // Assert
      expect(component.status).toEqual('success');
      expect(productService.getAll).toHaveBeenCalled();
    }));

    it('should return change the status "loading" => "error"', fakeAsync(() => {
      // Arrange
      productService.getAll.mockReturnValue(asyncError('error'));

      component.getAllProducts();
      spectator.detectChanges();

      expect(component.status).toEqual('loading');

      spectator.tick(2000); // flush the observable and resolve data

      // Assert
      expect(component.status).toEqual('error');
      expect(productService.getAll).toHaveBeenCalled();
    }));
  });

  describe('test for callPromise', () => {
    it('call promise', async () => {
      // Arrange
      const mockValue = 'my mock string';
      valueService.getPromiseValue.mockResolvedValue(mockValue);
      // Act
      await component.callPromise();
      spectator.detectChanges();
      // Assert
      expect(component.rta).toEqual(mockValue);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should show "my mock string" in <p> when btn was clicked', async () => {
      // Arrange
      const mockMsg = 'my mock click string';
      valueService.getPromiseValue.mockResolvedValue(mockMsg);
      // Act
      spectator.click(byTestId('btn-promise'));
      await spectator.fixture.whenStable();
      spectator.detectChanges();
      // Assert
      const textRta = spectator.query(byTestId('rta'));
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(textRta?.textContent).toContain(mockMsg);
    });
  });
});
