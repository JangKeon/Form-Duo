package com.example.jpa_demo.web.controller;


import com.example.jpa_demo.service.surveys.SurveyRespService;
import com.example.jpa_demo.service.surveys.SurveyService;
import com.example.jpa_demo.web.dto.survey_resps.SurveyRespsRequestDto;
import com.example.jpa_demo.web.dto.survey_resps.SurveyRespsResponseDto;
import com.example.jpa_demo.web.dto.surveys.SurveysRequestDto;
import com.example.jpa_demo.web.dto.surveys.SurveysResponseDto;
import com.example.jpa_demo.web.dto.surveys.SurveysUpdateRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "설문 응답", description = "설문 응답 관련 api 입니다.")
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@RestController
public class SurveyRepsApiController {

    private final SurveyRespService surveyRespService;


    @Operation(summary = "설문 응답 생성 요청", description = "설문에 대한 응답이 생성됩니다.")
    @PostMapping("/resp")
    public int save(@RequestBody SurveyRespsRequestDto requestDto) {
        return surveyRespService.save(requestDto);
    }

    @Operation(summary = "설문 응답 조회 요청", description = "설문이 대한 특정 응답이 조회됩니다.")
    @GetMapping("/surveys/reps/{id}")
    public SurveyRespsResponseDto findSurveyRespById (@PathVariable Integer id) {
        return surveyRespService.findById(id);
    }

    @Operation(summary = "설문 전체 응답 요청", description = "설문에 대한 전체응답정보를 요청합니다.")
    @GetMapping("/surveys/{svyId}/reps")
    public List<SurveyRespsResponseDto> findAllRepsById (@PathVariable Integer svyId) {
        return surveyRespService.findAll(svyId);
    }

}
