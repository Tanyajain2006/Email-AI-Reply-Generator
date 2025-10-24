package com.email.writer.dto;

import lombok.Data;

import java.util.Collection;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;

    public String getTone(){
        if(this.tone == null || this.tone.isEmpty()){
            return "";
        }

        return this.tone;
    }

    public char[] getEmailContent() {
        if (this.emailContent == null) {
            return null;
        }
        return this.emailContent.toCharArray();
    }
}
