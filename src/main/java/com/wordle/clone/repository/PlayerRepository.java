package com.wordle.clone.repository;

import com.wordle.clone.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    Optional<Player> findByName(String name);
    List<Player> findTop5ByOrderByScoreDesc();
}
