package com.example.ordermicroservice.DatabaseBackups;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class OrderBackup {
    @Scheduled(cron = "0 0 1 * * MON")
    public void dump() throws Exception {
        System.out.println("backup database");
        String backName = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date());
        dataBaseDump("localhost", "3306", "root", "", "order", "orders", backName);
    }

    public static void dataBaseDump(String host, String port, String username, String password, String databasename, String databaseTable, String sqlname) throws Exception {
        File file = new File("D:\\NBP\\backups");
        if (!file.exists()) {
            file.mkdir();
        }
        File datafile = new File(file + File.separator + sqlname + ".sql");
        if (datafile.exists()) {
            System.out.println(sqlname + "File name already exists, please change");
            return;
        }
        //Stitch cmd command
        //mysqldump -u root -p order orders -r D:\NBP\backups\nesto.sql
        //cmd.exe /c mysqldump -h localhost -P 3306 -u root --password="" order -r D:\NBP\backups\2021-06-02-13-02-45.sql
        String command = "cmd.exe /c mysqldump -u " + username + " --password=\"" + password + "\"" + " " + databasename + " " + databaseTable + " -r " + datafile + "\n";
        System.out.println(command);

        Process exec = Runtime.getRuntime().exec(command);
        if (exec.waitFor() == 0) {
            System.out.println("Database backup is successful, the backup path is:" + datafile);
        }
        else{
            System.out.println("Izasao je: " + exec.waitFor());
            String text = new BufferedReader(
                    new InputStreamReader(exec.getErrorStream(), StandardCharsets.UTF_8)).lines()
                    .collect(Collectors.joining("\n"));
            System.out.println("Izasao je kao neki: " + text);
        }
    }
}
