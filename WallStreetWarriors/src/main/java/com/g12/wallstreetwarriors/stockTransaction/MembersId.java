package com.g12.wallstreetwarriors.stockTransaction;

import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class MembersId implements Serializable {


    private Long roomId;
    private Long userId;




}
