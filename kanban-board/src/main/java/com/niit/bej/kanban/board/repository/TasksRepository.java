package com.niit.bej.kanban.board.repository;

import com.niit.bej.kanban.board.model.Tasks;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TasksRepository extends MongoRepository<Tasks,String> {
    Optional<Tasks> findByTitle(String title);
}
