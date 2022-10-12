package com.example.jpa_demo.web.controller;


import com.example.jpa_demo.service.posts.PostService;
import com.example.jpa_demo.web.dto.posts.PostsResponseDto;
import com.example.jpa_demo.web.dto.posts.PostsSaveRequestDto;
import com.example.jpa_demo.web.dto.posts.PostsUpdateRequestDto;
import com.example.jpa_demo.web.dto.survey_resps.SurveyRespsResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "게시글", description = "게시글 관련 api 입니다.")
@RequiredArgsConstructor
@RequestMapping("/api/v1/posts")
@RestController
public class PostsApiController {

    private final PostService postService;

    @Operation(summary = "게시글 생성 요청", description = "게시글 생성을 요청합니다.")
    @PostMapping("")
    public Long save(@RequestBody PostsSaveRequestDto requestDto) {
        return postService.save(requestDto);
    }

    @Operation(summary = "게시글 수정 요청", description = "게시글 id를 이용하여 게시글 수정을 요청합니다.")
    @PutMapping("/{id}")
    public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto){
        return postService.update(id, requestDto);
    }

    @Operation(summary = "게시글 조회 요청", description = "게시글 id를 이용하여 게시글 조회를 요청합니다.")
    @GetMapping("/{id}")
    public PostsResponseDto findById (@PathVariable Long id) {
        return postService.findById(id);
    }
}
