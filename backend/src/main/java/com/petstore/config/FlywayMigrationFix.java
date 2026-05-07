package com.petstore.config;

import java.sql.Connection;
import java.sql.Statement;

import javax.sql.DataSource;

import org.springframework.stereotype.Component;

@Component
public class FlywayMigrationFix {
    private final DataSource dataSource;

    public FlywayMigrationFix(DataSource dataSource) throws Exception {
        this.dataSource = dataSource;
        cleanupFailedMigrations();
    }

    private void cleanupFailedMigrations() throws Exception {
        try (Connection conn = dataSource.getConnection(); 
             Statement stmt = conn.createStatement()) {
            // Check if the migration table exists
            try {
                stmt.execute("SELECT 1 FROM flyway_schema_history LIMIT 1");
                // Delete failed migrations to allow re-running them
                stmt.execute("DELETE FROM flyway_schema_history WHERE success = false");
                conn.commit();
            } catch (Exception e) {
                // Table doesn't exist yet, which is fine
            }
        }
    }
}
