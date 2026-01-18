package com.exampleinventory.demoinventorysystem.service;

import com.exampleinventory.demoinventorysystem.entity.Inventory;
import com.exampleinventory.demoinventorysystem.enums.InventoryStatus;
import com.exampleinventory.demoinventorysystem.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository repository;

    public Inventory addItem(Inventory item) {
//        if (repository.existsByItemNameIgnoreCase(item.getItemName())) {
//            throw new RuntimeException("Item already exists");
//        }
//        validateQuantity(item.getQuantity());

        item.setStatus(getStatus(item.getQuantity()));
        return repository.save(item);
    }

    public List<Inventory> getAllItems() {
        return repository.findAll();
    }

    public Inventory updateItem(Long id, Inventory updated) {
        Inventory item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setItemName(updated.getItemName());
        item.setCategory(updated.getCategory());
        item.setQuantity(updated.getQuantity());
        item.setStatus(getStatus(updated.getQuantity()));

        return repository.save(item);
    }

    public void deleteItem(Long id) {
        repository.deleteById(id);
    }



    private void validateQuantity(int quantity) {
        if (quantity < 0) {
            throw new RuntimeException("Quantity cannot be negative");
        }
    }

    private InventoryStatus getStatus(int quantity) {
        return quantity > 10
                ? InventoryStatus.AVAILABLE
                : InventoryStatus.LOW_STOCK;
    }


}

