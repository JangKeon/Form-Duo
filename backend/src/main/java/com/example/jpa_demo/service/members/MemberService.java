package com.example.jpa_demo.service.members;

import com.example.jpa_demo.domain.users.Users;
import com.example.jpa_demo.util.SecurityUtil;
import com.example.jpa_demo.domain.members.Members;
import com.example.jpa_demo.domain.members.MemberRepository;
import com.example.jpa_demo.web.dto.members.MemberRemoveDTO;
import com.example.jpa_demo.web.dto.members.MemberRespDTO;
import com.example.jpa_demo.web.dto.members.MemberUpdateDTO;
import com.example.jpa_demo.util.exceptionhandler.BizException;
import com.example.jpa_demo.util.exceptionhandler.MemberExceptionType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * MemberService 설명 : 멤버 등록 및 조회
 * @version 1.0.0
 **/
@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * @param email
     * @return email에 해당하는 멤버의 정보를 반환한다.
     */
    @Transactional(readOnly = true)
    public MemberRespDTO getMemberInfo(String email) {
        return memberRepository.findByEmail(email)
                .map(MemberRespDTO::of)
                .orElseThrow(() -> new BizException(MemberExceptionType.NOT_FOUND_USER)); // 유저를 찾을 수 없습니다.
    }

    /**
     * @return 현재 securityContext에 있는 유저 정보를 반환한다.
     */
    @Transactional(readOnly = true)
    public MemberRespDTO getMyInfo() {
        return memberRepository.findByEmail(SecurityUtil.getCurrentMemberEmail())
                .map(MemberRespDTO::of)
                .orElseThrow(() -> new BizException(MemberExceptionType.NOT_FOUND_USER));
    }


    /**
     * @param MemberUpdateDTO DirtyChecking 을 통한 멤버 업데이트 ( Email은 업데이트 할 수 없다.)
     */
    @Transactional
    public void updateMemberInfo(MemberUpdateDTO dto) {
        Members members = memberRepository
                .findByEmail(dto.getEmail())
                .orElseThrow(() -> new BizException(MemberExceptionType.NOT_FOUND_USER));

        members.updateMember(dto, passwordEncoder);
    }

    @Transactional
    public String remove(MemberRemoveDTO dto) {
        Members entity = memberRepository
                .findByEmail(dto.getEmail())
                .orElseThrow(() -> new BizException(MemberExceptionType.NOT_FOUND_USER));

        entity.remove('Y');
        memberRepository.save(entity);
        return entity.getEmail();
    }

}
