package it.akademija.documents.repository;

import it.akademija.documents.DocumentState;
import it.akademija.documents.MyGenerator;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class DocumentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;



    private Integer documentIdentifier;

    private String author;

    private String title;

    private String description;

    private String type;

    @Enumerated(EnumType.STRING)
    private DocumentState documentState = DocumentState.CREATED;


    private LocalDateTime postedDate;
    private LocalDateTime approvalDate;
    private LocalDateTime rejectedDate;
    private String approver;
    private String rejectionReason;


    public DocumentEntity() {

    }

    public DocumentEntity(String title, String description, String type) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.documentIdentifier = 1;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;

    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDateTime postedDate) {
        this.postedDate = postedDate;
    }

    public LocalDateTime getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(LocalDateTime approvalDate) {
        this.approvalDate = approvalDate;
    }

    public LocalDateTime getRejectedDate() {
        return rejectedDate;
    }

    public void setRejectedDate(LocalDateTime rejectedDate) {
        this.rejectedDate = rejectedDate;
    }

    public String getApprover() {
        return approver;
    }

    public void setApprover(String approver) {
        this.approver = approver;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }


    public int getDocumentIdentifier() {
        return documentIdentifier;
    }

    public void setDocumentIdentifier(Integer documentIdentifier) {
        this.documentIdentifier = documentIdentifier;
    }

    public DocumentState getDocumentState() {
        return documentState;
    }

    public void setDocumentState(DocumentState documentState) {
        this.documentState = documentState;

    }


}


