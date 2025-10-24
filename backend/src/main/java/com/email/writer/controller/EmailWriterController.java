package com.email.writer.controller;

import com.email.writer.EmailReplyGeneratorApplication;
import com.email.writer.dto.EmailRequest;
import com.email.writer.service.EmailGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = {
        "https://mail.google.com",  // For Gmail Extension
        "http://localhost:3000",    // For React dev server
        "http://localhost:5173"     // For Vite/another React dev server
})
public class EmailWriterController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}
