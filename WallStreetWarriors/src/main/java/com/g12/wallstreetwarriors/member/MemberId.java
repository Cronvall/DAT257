package com.g12.wallstreetwarriors.member;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class MemberId implements Serializable {

    private Long roomId;
    private Long userId;
}
