package com.exampleinventory.demoinventorysystem.repository;

import com.exampleinventory.demoinventorysystem.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository
        extends JpaRepository<Inventory, Long> {
    //boolean existsByItemNameIgnoreCase(String itemName);

}
